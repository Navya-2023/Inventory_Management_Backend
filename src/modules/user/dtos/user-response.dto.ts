//DTO for structuring user related responses
export class UserResponseDto {
  constructor(
    public success: boolean,
    public message: string,
    public errors: string[] = []
  ) {}
}

