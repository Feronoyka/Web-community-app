export interface AuthRequest {
  user: {
    sub: string;
    domainName: string;
    email: string;
  };
}
