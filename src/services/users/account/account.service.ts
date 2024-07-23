export const getUserFromUserId = async (id: string) => {
  try {
    const res = await fetch(`/api/auth/users/${id}`);
    console.log(res);
    if (!res.ok) {
      const errorData = await res.json();
      console.error('Server response error:', errorData);
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const patchUserFromUserId = async () => {};
