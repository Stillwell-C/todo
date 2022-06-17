import TaskList from "./tasklist.js"

export default class CompletedTaskList extends TaskList {
    completedTaskClick(taskLine) {
        console.log('task completed')

        this.save()

        const filteredData = this.scrubData().filter((task) => task.completed != true)

        console.log(filteredData)

        filteredData.forEach(item => {
            const itemList = JSON.parse(localStorage.getItem(item.list)) || [];
            itemList.push(item);
            localStorage.setItem(item.list, JSON.stringify(itemList))
        })

        this.deleteTask(taskLine);
    }
}