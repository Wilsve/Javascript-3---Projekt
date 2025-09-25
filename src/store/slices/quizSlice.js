import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    username: '',
    region: '',
    questions: [],
    currentQuestion: 0,
    score: 0,
    isFinished: false,
  },
  
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addScore: (state) => {
      state.score = state.score + 1;
    },
    nextQuestion: (state) => {
        if (state.currentQuestion < state.questions.length - 1) {
          state.currentQuestion = state.currentQuestion + 1;
        } else {
          state.isFinished = true;
        }
      },
    restart: (state) => {
      state.currentQuestion = 0;
      state.score = 0;
      state.isFinished = false;
    },
  }
});

export const { setUsername, setRegion, setQuestions, addScore, nextQuestion, restart, fullReset } = quizSlice.actions;
export default quizSlice.reducer;