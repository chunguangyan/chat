export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'group_admin' | 'super_admin';
  groups: string[];
  avatar: string;
}
