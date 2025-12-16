export interface AuthRequest extends Request {
  user: {
    sub: string;
    domainName: string;
    email: string;
  };
}
