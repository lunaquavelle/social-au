
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
      
      story: {
        opening: "Hey. You're home?",

        choices: [
          {
            reply: "Not yet. Why?",
            response: "Just making sure you got home safely.",
            choices: [
              {
                reply: "That's unusual of you.",
                response: "Is it?",
                choices: [
                  {
                    reply: "A little.",
                    response: "I'll take that as a compliment."
                  },
                  {
                    reply: "No, it's nice.",
                    response: "Good. I was hoping you'd say that."
                  }
                ]
              },
              {
                reply: "You always check on people?",
                response: "Not everyone.",
                choices: [
                  {
                    reply: "Oh?",
                    response: "Don't make me explain over text."
                  },
                  {
                    reply: "I see...",
                    response: "You don't sound convinced."
                  }
                ]
              }
            ]
          },

          {
            reply: "I'm on my way home.",
            response: "Alright. Let me know when you get there.",
            choices: [
              {
                reply: "Why? Worried?",
                response: "Would that be a problem?",
                choices: [
                  {
                    reply: "Maybe not.",
                    response: "Then get home safely, Alya."
                  },
                  {
                    reply: "A little bit.",
                    response: "I'll try not to make it obvious."
                  }
                ]
              },
              {
                reply: "Okay, I will.",
                response: "Good. Watch the road."
              }
            ]
          },

          {
            reply: "Already home. Thanks for asking.",
            response: "Good. I wasn't sure if you got back safely.",
            choices: [
              {
                reply: "You noticed I left?",
                response: "I notice things.",
                choices: [
                  {
                    reply: "Apparently.",
                    response: "Apparently."
                  },
                  {
                    reply: "That's interesting.",
                    response: "Is that so?"
                  }
                ]
              },
              {
                reply: "That's sweet of you.",
                response: "Don't tell anyone. I have a reputation."
              }
            ]
          }
        ]
            }
    }
  ]
};

// Make AU_DATA accessible to app.js
window.AU_DATA = AU_DATA;
