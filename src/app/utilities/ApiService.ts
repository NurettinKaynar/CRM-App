export class ApiUrls {
  public static readonly BASE_URL = import.meta.env.VITE_APP_API_URL;
  public static readonly LOGIN = "Admin/LogIn";
  public static readonly REGISTER = "Admin/SignUp";
  public static readonly GET_TASK_LIST = "AppTask/GetAppTasks";
}
