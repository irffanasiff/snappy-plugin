interface Iframe {}

export type User = {
  auth: boolean;
  _id?: string;
  username?: string;
  name?: string;
  email?: string;
  picture?: string;
  isPro: boolean;
  token?: string;
  num_images_generated: number;
};

export type UserResponse = {
  code: string;
  token: String;
  user: {
    user_platform: any;
    _id: string;
    username: string;
    name: string;
    email: string;
    picture: string;
    isPro: boolean;
    user_images: [any];
    num_images_generated: number;
  };
};
export type IModal = {
  isOpen: boolean;
  heading: string;
  content: string;
  button: {
    text: string;
    action: () => {};
  };
};
export type ISubmittedData = {
  prompt: string;
  prompt_strength?: number;
  frame?: Iframe | Iframe[];
  num_outputs?: number;
};
