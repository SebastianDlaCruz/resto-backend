import { HttpStatus } from "@nestjs/common";

export interface ResponseSuccess {
  statusCode: HttpStatus;
  message?: string;
  data?: unknown;
  success: boolean;
}