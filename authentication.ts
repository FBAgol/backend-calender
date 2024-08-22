import * as express from "express";
import * as jwt from "jsonwebtoken";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "jwt") {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers["x-access-token"];

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
      }

      jwt.verify(token, process.env.JWT_SECRET as string, function (err: any, decoded: any) {
        if (err) {
          reject(new Error("Failed to authenticate token"));
        } else {
          // Überprüfe die Scopes (Berechtigungen)
          if (scopes) {
            for (let scope of scopes) {
              if (!decoded.scopes.includes(scope)) {
                reject(new Error("Insufficient scope"));
              }
            }
          }
          resolve(decoded); // Benutzer ist authentifiziert
        }
      });
    });
  } else {
    return Promise.reject(new Error("Unknown security name"));
  }
}
