import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

/**
 * BaseApiResponse is a generic class that defines the structure of the response object
 * returned by the API endpoints. It contains the statusCode, message, data, and error properties.
 * This class is useful when you need to return a response object from an API endpoint.
 * The statusCode property is the HTTP status code of the response.
 * The message property is an array of messages that describe the response.
 * The data property is the actual data returned by the API endpoint.
 * The error property is an array of error messages that describe any errors that occurred during the request.
 * The data and error properties are optional, depending on the context of the response.
 * The message property is always present in the response object.
 * The BaseApiResponse class is used as the base class for other response classes in the application.
 * @param T The type of the data property in the response object.
 */
export class BaseApiResponse<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({ required: false })
  error?: string[];

  constructor(
    statusCode: HttpStatus,
    data?: T,
    error?: string[],
    message = [],
  ) {
    this.data = data;
    this.error = error;
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * ApiResponsePaginated is a generic class that extends BaseApiResponse
 * and adds a meta property to the response object.
 * The meta property contains information about the total number of items,
 * the limit, and the offset of the paginated response.
 * This class is useful when you need to return paginated data from an API endpoint.
 */
export class ApiResponsePaginated<T> extends BaseApiResponse<T> {
  meta?: {
    total: number;
    limit: number;
    offset: number;
  };
}
