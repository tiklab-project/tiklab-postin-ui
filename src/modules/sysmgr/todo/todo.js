import React from 'react';
import {TaskList as Task} from 'tiklab-todotask-ui'

const TaskList = (props) => {
    return <Task {...props} bgroup={"postin"}/>
}

export default TaskList;