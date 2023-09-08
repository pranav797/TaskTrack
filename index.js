
import express from "express";
import bodyParser from "body-parser";
import { render } from "ejs";

const app = express()
const port  = 3000;

var taskList = [];
var timeList = [];

var taskListWork = [];
var timeListWork = [];

// $(".custom-button").click(function(){
//     animatePress();
// });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log(taskList.length);

    res.render("index.ejs", { addedTasks: taskList, selectedTimes: timeList });
})

app.get("/work", (req, res) => {
    res.render("work.ejs", { addedTasksWork: taskListWork, selectedTimesWork: timeListWork });
})

app.post("/submit", (req, res) => {
    const taskName = req.body["task"]
    const chooseTime = req.body["time"]

    if ((taskName) && (taskName != taskList[taskList.length - 1])) {
        taskList.push(taskName);
        timeList.push(chooseTime);

        res.redirect("/");
    }
    
    console.log(taskList);
})

app.post("/submit-work", (req, res) => {
    const taskNameWork = req.body["taskWork"]
    const chooseTimeWork = req.body["timeWork"]

    if ((taskNameWork) && (taskNameWork != taskListWork[taskListWork.length - 1])) {
        taskListWork.push(taskNameWork);
        timeListWork.push(chooseTimeWork);

        res.redirect("/work");
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})