export const getMessages = async () => {
  try {
    const response = await fetch('/api/auth/chat', {
      method: 'GET',
    });

    const data = await response.json();

    if (!data.errorMsg) {
      alert('메세지 불러오기 성공!');
    } else {
      alert(`메세지 불러오기 에러: ${data.errorMsg}`);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
