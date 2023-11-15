
export interface AuthForm {
    email : string;
    password : string;
}

export interface RegisterForm {
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    confirmPassword : string;
}

export interface ForgotPasswordForm {
    email : string;
}