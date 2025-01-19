Routine you choose
Pull day HIIT

took 1 hours and 30 minutes
create TimeSpentForSession
timeSpentForSession: {
  id: 0,
  routine_id: 0,
  session_history_id: 3,
  time_spent: 3780, // 1 hours and 30 minutes
}

2025-01-22-00:30-0000
session base ["routine"] pull day HIIT
routine_id: 0,
[
  {
    name: "set-1",
    type: hiit,
    n_sets: 3,
    interval: {60 rest},
    exercise_histories:[
      {set_index: 0,  "pull up", 10 repetition_goal: Repetition, repetition_done: Repetition,  goal_interval:Interval, actual_interval: Interval,  },
      {set_index: 0,  "body row", 10 repetition_goal: Repetition, repetition_done: Repetition,  goal_interval:Interval, actual_interval: Interval,  },
      {set_index: 1, "pull up", 10 repetition_goal: Repetition, repetition_done: Repetition,  goal_interval:Interval, actual_interval: Interval,  },
      {set_index: 1, "body row", 10 repetition_goal: Repetition, repetition_done: Repetition,  goal_interval:Interval, actual_interval: Interval,  },
      {set_index: 2, "pull up", 10 repetition_goal: Repetition, repetition_done: Repetition,  goal_interval:Interval, actual_interval: Interval,  },
      {set_index: 2, "body row", 10 repetition_goal: Repetition, repetition_done: Repetition,  goal_interval:Interval, actual_interval: Interval,  }
  ],
  }
]

example or routine
{
  id: x,
  name: Pull day HIIT,
  blocks: [
    {
      type: hiit,
      n_sets: 3,
      interval: {
        rest_time: 60,
      },
      exercises: [
        {
          id: "",
          name: pull ups,
          description:"",
          image:"",
          repetitions: {
            reps_goal: 10,
          },
          interval: {
            active_time: 20,
            rest_time: 30
          },
          weight: {
            number: 0,
            type: body-weight
          },
          created_by: {}
        },
        {
          id: "",
          name: body-rows,
          description:"",
          image:"",
          repetitions: {
            reps_goal: 10,
          },
          interval: {
            active_time: 20,
            rest_time: 30
          },
          weight: {
            number: 0,
            type: body-weight
          },
          created_by: {}
        },
      ]
    },
    {
      type: hiit,
      n_sets: 3,
      interval: {
        rest_time: 60,
      },
      exercises: [
        {
          id: "",
          name: bicep chin-up,
          description:"",
          image:"",
          repetitions: {
            reps_goal: 10,
          },
          interval: {
            active_time: 20,
            rest_time: 30
          },
          weight: {
            number: 0,
            type: body-weight
          },
          created_by: {}
        },
        {
          id: "",
          name: hammer-curls,
          description:"",
          image:"",
          repetitions: {
            reps_goal: 10,
          },
          interval: {
            active_time: 20,
            rest_time: 30
          },
          weight: {
            number: 10, // 10kg each
            type: dumbbells
          },
          created_by: {}
        },
      ]
    },
  ]
}