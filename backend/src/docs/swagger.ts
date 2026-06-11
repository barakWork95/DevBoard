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
    // Auth API's
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
    // Project API's
    "/api/projects": {
      get: {
        summary: "Get all projects",
        tags: ["Project"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Projects fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Project" },
                    },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
          500: { description: "Internal server error" },
        },
      },
      post: {
        summary: "Create a new project",
        tags: ["Project"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", example: "DevBoard" },
                  status: {
                    type: "string",
                    enum: ["backlog", "active", "complete"],
                    example: "backlog",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Project created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Project" },
              },
            },
          },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/api/projects/{id}": {
      get: {
        summary: "Get a project by ID",
        tags: ["Project"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          200: {
            description: "Project fetched successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Project" },
              },
            },
          },
          401: { description: "Unauthorized" },
          404: { description: "Project not found" },
          500: { description: "Internal server error" },
        },
      },
      put: {
        summary: "Update a project",
        tags: ["Project"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "DevBoard v2" },
                  status: {
                    type: "string",
                    enum: ["backlog", "active", "complete"],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Project updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Project" },
              },
            },
          },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          404: { description: "Project not found" },
          500: { description: "Internal server error" },
        },
      },
      delete: {
        summary: "Delete a project",
        tags: ["Project"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          204: { description: "Project deleted successfully" },
          401: { description: "Unauthorized" },
          404: { description: "Project not found" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/api/projects/{id}/members": {
      get: {
        summary: "Get all members of specific project",
        tags: ["Project"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          200: {
            description: "Members fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/User" },
                    },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
          404: { description: "Project not found" },
          500: { description: "Internal server error" },
        },
      },
      post: {
        summary: "Add members to specific project",
        tags: ["Project"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "array",
                    items: { type: "string", format: "email" },
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Members added successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Project" },
              },
            },
          },
          401: { description: "Unauthorized" },
          404: { description: "Project not found" },
          500: { description: "Internal server error" },
        },
      },
    },
    // Task API's
    "/api/tasks": {
      get: {
        summary: "Get all tasks (optionally filter by projectId)",
        tags: ["Task"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "projectId",
            in: "query",
            required: false,
            schema: { type: "string", format: "uuid" },
            description: "Filter tasks by project",
          },
        ],
        responses: {
          200: {
            description: "Tasks fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Task" },
                    },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
          500: { description: "Internal server error" },
        },
      },
      post: {
        summary: "Create a new task",
        tags: ["Task"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "projectId", "priority", "status"],
                properties: {
                  title: { type: "string", example: "Implement login page" },
                  description: {
                    type: "string",
                    example: "Build the login UI",
                  },
                  projectId: { type: "string", format: "uuid" },
                  assignee: { type: "string", format: "uuid" },
                  parent: { type: "string", format: "uuid" },
                  labels: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: ["FE", "BE", "DevOps", "QA", "UI/UX", "PM"],
                    },
                  },
                  status: {
                    type: "string",
                    enum: [
                      "backlog",
                      "in-progress",
                      "code-review",
                      "done",
                      "released",
                    ],
                    example: "backlog",
                  },
                  priority: {
                    type: "string",
                    enum: ["low", "medium", "high", "critical"],
                    example: "medium",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" },
              },
            },
          },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/api/tasks/{id}": {
      get: {
        summary: "Get a task by ID",
        tags: ["Task"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          200: {
            description: "Task fetched successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" },
              },
            },
          },
          401: { description: "Unauthorized" },
          404: { description: "Task not found" },
          500: { description: "Internal server error" },
        },
      },
      put: {
        summary: "Update a task",
        tags: ["Task"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Updated task title" },
                  description: { type: "string" },
                  assignee: { type: "string", format: "uuid" },
                  labels: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: ["FE", "BE", "DevOps", "QA", "UI/UX", "PM"],
                    },
                  },
                  status: {
                    type: "string",
                    enum: [
                      "backlog",
                      "in-progress",
                      "code-review",
                      "done",
                      "released",
                    ],
                  },
                  priority: {
                    type: "string",
                    enum: ["low", "medium", "high", "critical"],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Task updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" },
              },
            },
          },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          404: { description: "Task not found" },
          500: { description: "Internal server error" },
        },
      },
      delete: {
        summary: "Delete a task",
        tags: ["Task"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          204: { description: "Task deleted successfully" },
          401: { description: "Unauthorized" },
          404: { description: "Task not found" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/api/tasks/{id}/status": {
      patch: {
        summary: "Update task status",
        tags: ["Task"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: {
                    type: "string",
                    enum: [
                      "backlog",
                      "in-progress",
                      "code-review",
                      "done",
                      "released",
                    ],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Task status updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" },
              },
            },
          },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
          404: { description: "Task not found" },
          500: { description: "Internal server error" },
        },
      },
    },
    // User API's
    "/api/users/me": {
      get: {
        summary: "Get the logged-in user",
        tags: ["User"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "User fetched successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          401: { description: "Unauthorized" },
          500: { description: "Internal server error" },
        },
      },
      put: {
        summary: "Update User",
        tags: ["User"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Updated user name" },
                  email: { type: "string", format: "email" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          401: { description: "Unauthorized" },
          500: { description: "Internal server error" },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        summary: "Get User by Id",
        tags: ["User"],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          200: {
            description: "User fetched successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          401: { description: "Unauthorized" },
          404: { description: "User not found" },
          500: { description: "Internal server error" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          role: { type: "string", enum: ["admin", "member"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Project: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          owner: { type: "string", format: "uuid" },
          status: { type: "string", enum: ["backlog", "active", "complete"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Task: {
        type: "object",
        required: [
          "id",
          "title",
          "creator",
          "assignee",
          "projectId",
          "labels",
          "status",
          "priority",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: { type: "string", format: "uuid" },
          title: { type: "string" },
          description: { type: "string" },
          creatorId: { type: "string", format: "uuid" },
          assigneeId: { type: "string", format: "uuid" },
          projectId: { type: "string", format: "uuid" },
          parentId: { type: "string", format: "uuid" },
          labels: {
            type: "array",
            items: {
              type: "string",
              enum: ["FE", "BE", "DevOps", "QA", "UI/UX", "PM"],
            },
          },
          status: {
            type: "string",
            enum: ["backlog", "in-progress", "code-review", "done", "released"],
          },
          priority: {
            type: "string",
            enum: ["low", "medium", "high", "critical"],
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
  },
};
