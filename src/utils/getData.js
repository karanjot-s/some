export const getPosts = () => [
  {
    id: 1,
    desc: "This is photo description 1",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1275&q=80",
    date: "2023-02-03T16:35:38.041Z",
    userId: 1,
    likes: 32,
    comments: 9,
    liked: false,
  },
  {
    id: 2,
    desc: "This is photo description 2. And I want to tell you one thing that this is long description",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "2023-02-24T16:35:38.041Z",
    userId: 2,
    likes: 55,
    comments: 10,
    liked: true,
  },
  {
    id: 3,
    desc: "This is photo description",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    date: "2023-03-03T16:35:38.041Z",
    userId: 1,
    likes: 32,
    comments: 9,
    liked: false,
  },
];

export const getUsers = () => [
  { userId: 1, name: "Karanjot Singh", username: "karanjot" },
  { userId: 2, name: "Gurjot Singh", username: "gurjot" },
];
