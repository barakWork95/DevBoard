export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "DevBoard API",
    version: "1.0.0",
    description: "Project management SaaS API",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  paths: {
    "/api/auth/register": {
      post: {
        summary: "Register a new user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "Barak Vadei" },
                  email: {
                    type: "string",
                    format: "email",
                    example: "barak@devboard.com",
                  },
                  password: {
                    type: "string",
                    minLength: 8,
                    example: "password123",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    accessToken: { type: "string" },
                    refreshToken: { type: "string" },
                    user: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          400: { description: "Validation error" },
          409: { description: "Email already exists" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Login",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "barak@devboard.com" },
                  password: {
                    type: "string",
                    minLength: 8,
                    example: "password123",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    accessToken: { type: "string" },
                    refreshToken: { type: "string" },
                  },
                },
              },
            },
          },
          400: { description: "Validation error" },
          401: { description: "Username or password are incorrect" },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        summary: "Logout",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["refreshToken"],
                properties: {
                  refreshToken: { type: "string", example: "Aa123Bb456" },
                },
              },
            },
          },
        },
        responses: {
          204: {
            description: "Logged out successfully",
            content: {},
          },
          500: { description: "Internal server error" },
          401: { description: "Invalid refresh token" },
        },
      },
    },
    "/api/auth/refresh": {
      post: {
        summary: "Refresh token for authentication",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["refreshToken"],
                properties: {
                  refreshToken: { type: "string", example: "Aa123Bb456" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "New access Token created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    accessToken: { type: "string" },
                  },
                },
              },
            },
          },
          500: { description: "Internal server error" },
          401: { description: "Invalid refresh token" },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          role: { type: "string", enum: ["admin", "member"] },
          projectIds: {
            type: "array",
            items: { type: "string", format: "uuid" },
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
};
