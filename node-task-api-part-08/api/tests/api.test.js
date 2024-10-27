const request = require("supertest");
const expect = require("@jest/globals").expect;
const app = require("../../index");
const { execArgv } = require("process");

describe("User tests", () => {
  describe("GET /api/users", () => {
    it("It returns a list of users", async () => {
      const response = await request(app).get("/api/users");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/users/jonnygold", () => {
    it("It returns a user", async () => {
      const response = await request(app).get("/api/users/jonnygold");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.userName).toBe("jonnygold");
    });

    it("It returns a user with the expected username", async () => {
      const response = await request(app).get("/api/users/jonnygold");
      expect(response.body.userName).toBe("jonnygold");
    });

    it("It returns a user with the expected email", async () => {
      const response = await request(app).get("/api/users/jonnygold");
      expect(response.body.email).toBe("jonnygold@gmail.com");
    });
  });
  describe("POST /api/users/login", () => {
    it("It authenticates a user when supplied with the correct credentials", async () => {
      const response = await request(app).post("/api/users/login").send({
        userName: "jonnygold",
        password: "1234",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.isAuthenticated).toBe(true);
      expect(response.body.status).toBe("User found");
    });

    it("It does not authenticate a user when supplied with the incorrect credentials", async () => {
      const response = await request(app).post("/api/users/login").send({
        userName: "jonnygold",
        password: "12345",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.isAuthenticated).toBe(false);
      expect(response.body.status).toBe("User not found");
    });
  });
});

describe("Task tests", () => {
  describe("GET /api/tasks/user/jonnygold", () => {
    it("It returns a list of tasks assigned to a user", async () => {
      const response = await request(app).get("/api/tasks/user/jonnygold");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/tasks/task/1", () => {
    it("It returns a single tasks", async () => {
      const response = await request(app).get("/api/tasks/task/1");
      expect(response.statusCode).toBe(200);
        expect(response.body).toBeTruthy();
        // expect(response.body.taskId).toBe(1);
        // escape(response.body.user).toBe("jonnygold");
    });
  });

  describe("POST /api/tasks/add", () => {
    it("It adds a task", async () => {
      const response = await request(app).post("/api/tasks/add").send({
        description: "My task",
        name: "task",
        user: "jonnygold",
        status: "done",
      });
      console.log(response.body);
      expect(response).toBeTruthy();
      expect(response.body).toBeTruthy();
      expect(response.body.name).toBe("task");
      expect(response.body.user).toBe("jonnygold");
    });
  });

  describe("POST /api/tasks/update/4", () => {
    it("It updates a task", async () => {
      const response = await request(app).post("/api/tasks/update/4").send({
        "description": "My task",
        "name": "task",
        "user": "jonnygold",
        "status": "done",
        "added": "2024-10-27T13:18:46.635Z",
        "updated": "2024-10-27T13:18:46.635Z",
        "isActive": true
      });
      console.log(response.body);
      expect(response).toBeTruthy();
      expect(response.body).toBeTruthy();
      expect(response.body.name).toBe("task");
      expect(response.body.status).toBe("done");
    });
  });

  describe("POST /api/tasks/delete", () => {
    it("It deletes (isActive:false) a task", async () => {
      const response = await request(app).post("/api/tasks/delete").send({
        "taskId":4
      });
      console.log(response.body);
      expect(response).toBeTruthy();
    //   expect(response.body.isActive).toBeFalsy();
    
      
    });
  });
});
