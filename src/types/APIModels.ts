interface RegisterData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  cPassword: string;
  userId: string;
}

interface EditedUser {
  fname: string;
  lname: string;
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewP: string;
}

export type { RegisterData, LoginData, EditedUser, ChangePassword };
