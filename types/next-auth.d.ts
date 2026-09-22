import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
    token?: string;
    picture?: string;
    sub?: string;
    isBuyerProfileFiled?: boolean;
    isDeveloperProfileFiled?: boolean;
    isRealtorProfileFiled?: boolean;
    isHomeownerProfileFiled?: boolean;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      token?: string;
      picture?: string;
      isBuyerProfileFiled?: boolean;
      isDeveloperProfileFiled?: boolean;
      isRealtorProfileFiled?: boolean;
      isHomeownerProfileFiled?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    email?: string;
    token?: string;
    picture?: string;
    isBuyerProfileFiled?: boolean;
    isDeveloperProfileFiled?: boolean;
    isRealtorProfileFiled?: boolean;
    isHomeownerProfileFiled?: boolean;
  }
}
