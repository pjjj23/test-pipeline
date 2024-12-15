
import api from "../api";
import { useToast } from "@/hooks/use-toast";
import { RegisterFormData } from "@/schemas/register-schema";
import { handleError, handleSucess, ApiResponse } from "@/lib/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const registerUser = async (
  data: RegisterFormData
): Promise<ApiResponse<RegisterFormData>> => {
  try {
    const response = await api.post<RegisterFormData>(
      "api/user/register/ ",
      data
    );
    return handleSucess(response);
  } catch (error) {
    console.log(error)
    return handleError(error);
  }
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation<ApiResponse<RegisterFormData>, Error, RegisterFormData>({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Success",
        description:
          "Your account is pending activation by an administrator. You’ll be notified once it’s activated.",
      });
    },
  });
};
