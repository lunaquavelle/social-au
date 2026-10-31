
// AFTERHOURS — AU 001
// Title: BETWEEN THE LINES
// POV: Alya Pratama

const AU_DATA = {
  title: "Between the Lines",
  description: "Some stories begin with a coincidence.",

  posts: [
    {
      id: 1,
      name: "Alya Pratama",
      handle: "@alyainmotion",
      initial: "A",
      avatar: "purple",
      time: "2 min",
      verified: true,
      text: "first day of semester and i already embarrassed myself. great start.",
      replies: 24,
      reposts: 12,
      likes: 86,
      tag: "#newsemester"
    },
    {
      id: 2,
      name: "Nara Wijaya",
      handle: "@narawrites",
      initial: "N",
      avatar: "pink",
      time: "18 min",
      text: "some people really need to learn how to mind their own business. anyway, good morning!",
      replies: 8,
      reposts: 3,
      likes: 41
    },
    {
      id: 3,
      name: "Raka Mahendra",
      handle: "@rakarchive",
      initial: "R",
      avatar: "blue",
      time: "1 hr",
      text: "funny how you can remember someone's face but not their name.",
      replies: 16,
      reposts: 9,
      likes: 103
    },
    {
      id: 4,
      name: "Mika Sato",
      handle: "@mikamakesnoise",
      initial: "M",
      avatar: "green",
      time: "3 hr",
      text: "i have a theory and i need everyone to listen. no, actually, you HAVE to listen.",
      replies: 32,
      reposts: 21,
      likes: 157,
      tag: "#campuslife"
    },
    {
      id: 5,
      name: "Alya Pratama",
      handle: "@alyainmotion",
      initial: "A",
      avatar: "purple",
      time: "5 hr",
      text: "he returned my notebook. that's it. that's the tweet. why am i even posting this.",
      replies: 19,
      reposts: 5,
      likes: 112
    },
    {
      id: 6,
      name: "Raka Mahendra",
      handle: "@rakarchive",
      initial: "R",
      avatar: "blue",
      time: "6 hr",
      text: "don't forget to bring an umbrella tomorrow.",
      replies: 4,
      reposts: 2,
      likes: 67
    }
  ],

  characters: [
    {
      name: "Alya Pratama",
      handle: "@alyainmotion",
      initial: "A",
      avatar: "purple",
      bio: "The girl behind this phone. Observant, curious, and chronically online."
    },
    {
      name: "Nara Wijaya",
      handle: "@narawrites",
      initial: "N",
      avatar: "pink",
      bio: "Alya's best friend. Soft-spoken, thoughtful, and always notices everything."
    },
    {
      name: "Raka Mahendra",
      handle: "@rakarchive",
      initial: "R",
      avatar: "blue",
      bio: "Quiet, hard to read, and unexpectedly attentive."
    },
    {
      name: "Mika Sato",
      handle: "@mikamakesnoise",
      initial: "M",
      avatar: "green",
      bio: "The group's unofficial news station. Professional chaos maker."
    }
  ],

  conversations: [
    {
      id: "nara",
      name: "Nara Wijaya",
      handle: "@narawrites",
      initial: "N",
      avatar: "pink",
      preview: "YOU SAW THAT TOO, RIGHT?",
      messages: [
        {
          from: "them",
          text: "ALYA. are you online?",
          time: "20:14"
        },
        {
          from: "me",
          text: "unfortunately yes. what's up 😭",
          time: "20:15"
        },
        {
          from: "them",
          text: "you saw that guy from the hallway, right?",
          time: "20:15"
        },
        {
          from: "me",
          text: "which guy...",
          time: "20:16"
        },
        {
          from: "them",
          text: "THE TALL ONE. the one who kept looking at you.",
          time: "20:16"
        },
        {
          from: "me",
          text: "Nara please. it's literally day one.",
          time: "20:17"
        },
        {
          from: "them",
          text: "i'm just saying what i saw 🤷🏻‍♀️",
          time: "20:18"
        }
      ]
    },

    {
      id: "mika",
      name: "Mika Sato",
      handle: "@mikamakesnoise",
      initial: "M",
      avatar: "green",
      preview: "GROUP CHAT WHEN",
      messages: [
        {
          from: "them",
          text: "GROUP CHAT WHEN",
          time: "19:02"
        },
        {
          from: "them",
          text: "i have information and no patience",
          time: "19:02"
        },
        {
          from: "me",
          text: "you always have information 😭",
          time: "19:04"
        },
        {
          from: "them",
          text: "AND I WILL ALWAYS SHARE IT",
          time: "19:04"
        },
        {
          from: "them",
          text: "anyway alya, who's the guy?",
          time: "19:05"
        },
        {
          from: "me",
          text: "WHY DOES EVERYONE KEEP ASKING ME THAT",
          time: "19:06"
        }
      ]
    },

    {
      id: "raka",
      name: "Raka Mahendra",
      handle: "@rakarchive",
      initial: "R",
      avatar: "blue",
      preview: "You left your notebook.",
      messages: [
        {
          from: "them",
          text: "You left your notebook.",
          time: "16:48"
        },
        {
          from: "me",
          text: "oh— where?",
          time: "16:51"
        },
        {
          from: "them",
          text: "Library. I'll leave it with the front desk.",
          time: "16:52"
        },
        {
          from: "me",
          text: "oh my god, thank you 😭",
          time: "16:53"
        },
        {
          from: "them",
          text: "No problem.",
          time: "16:54"
        },
        {
          from: "me",
          text: "btw, you're Raka, right?",
          time: "16:56"
        },
        {
          from: "them",
          text: "Yeah. And you're Alya.",
          time: "16:57"
        },
        {
          from: "me",
          text: "you remember my name?",
          time: "16:58"
        },
        {
          from: "them",
          text: "It was written on your notebook.",
          time: "16:59"
        }
      ]
    }
  ]
};

// Make AU_DATA accessible to app.js
window.AU_DATA = AU_DATA;
