export default interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  avatarUrl?: string;
  email: string;
  status?: string;
  about?: string;
}
