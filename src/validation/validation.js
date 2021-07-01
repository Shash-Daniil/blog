const validation = {
  email: {
    required: {
      value: true,
      message: "Can't be empty.",
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Invalid email.',
    },
  },
  password: {
    required: {
      value: true,
      message: "Can't be empty.",
    },
    minLength: {
      value: 8,
      message: 'Too short',
    },
    maxLength: {
      value: 40,
      message: 'Too long',
    },
  },
  username: {
    required: {
      value: true,
      message: "Can't be empty.",
    },
    minLength: {
      value: 3,
      message: 'Too short',
    },
    maxLength: {
      value: 20,
      message: 'Too long',
    },
  },
  checkbox: {
    required: {
      value: true,
      message: 'agree!',
    },
  },
  title: {
    required: {
      value: true,
      message: "Can't be empty.",
    },
  },
  description: {
    required: {
      value: true,
      message: "Can't be empty.",
    },
  },
  body: {
    required: {
      value: true,
      message: "Can't be empty.",
    },
  },
};

export default validation;
