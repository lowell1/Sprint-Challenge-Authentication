const request = require("supertest");
const server = request(require("../api/server"));

describe("auth-router.js", () => {
    describe("index router", () => {
        it("should return status code 201 when registering a user", async () => {
            const user = {
                username: "user11",
                password: "password"
            };

            const expectedStatusCode = 201;

            const response = await server.post("/api/auth/register")
            .send(user)
            .set("Accept", "applications/json");

            expect(response.status).toEqual(expectedStatusCode);
        });
        it("should return status code 400 when missing a property while registering a user", async () => {
            const user = {
                username: "user"
            };

            const expectedStatusCode = 400;

            const response = await server.post("/api/auth/register")
            .send(user)
            .set("Accept", "applications/json");

            expect(response.status).toEqual(expectedStatusCode);
        });
        it("should return status code 200 when successful login", async () => {
            const user = {
                username: "user4",
                password: "password"
            };

            const expectedStatusCode = 200;

            const response = await server.post("/api/auth/login")
            .send(user)
            .set("Accept", "applications/json");

            expect(response.status).toEqual(expectedStatusCode);
        });
        it("should return status code 401 when invalid login credentials", async () => {
            const user = {
                username: "wlefhjwlefhwlfe",
                password: "password"
            };

            const expectedStatusCode = 401;

            const response = await server.post("/api/auth/login")
            .send(user)
            .set("Accept", "applications/json");

            expect(response.status).toEqual(expectedStatusCode);
        });
    });
});