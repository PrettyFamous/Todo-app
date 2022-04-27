import './Tasks.scss'
import axios from 'axios'

import editSvg from '../../assets/img/edit.svg'
import removeSvg from '../../assets/img/remove.svg'
import AddTaskForm from './AddTaskForm'
import { useEffect } from 'react'

export default function Tasks({ list, onEditTitle, onAddTask, onEditTask, onRemoveTask, withoutEmpty }) {
    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            })
            .catch(() => {
                alert('Ошибка. Не удалось обновить название списка')
            })
        }
    }

    const editRow = (task) => {
        const newText = window.prompt('Введите заметку:', task.text)
        console.log(task)
        if (newText) {
            onEditTask(task, newText)
            axios.patch('http://localhost:3001/tasks/' + task.id, {
                text: newText
            })
            .catch(() => {
                alert('Ошибка. Не удалось обновить название списка')
            })
        }   
    }

    const removeRow = (task) => {
        const answer = window.confirm('Вы действительно хотите удалить задачу?');
        if (answer) {
            onRemoveTask(task)
            axios.delete('http://localhost:3001/tasks/' + task.id)
            .catch(() => {
                alert('Ошибка. Не удалось обновить название списка')
            })
        }
    }

    useEffect(() => {
       
    }, [list])


  return (
    <div className='tasks'>
        <h2 style={{color: list.color.hex}} className='tasks__title'>
            {list.name}
            <img onClick={editTitle} src={editSvg} alt='Edit icon' />
        </h2>

        <div className="tasks__items">
            {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
            {list.tasks.map(task => (
                <div key={task.id} className="tasks__items-row">
                    <div className='checkbox'>
                        <input id={`task-${task.id}`} type="checkbox" />
                        <label htmlFor={`task-${task.id}`}>
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </label>
                    </div>
                        <input readOnly value={task.text} />
                        <div className='buttons'>
                            <img onClick={() => editRow(task)} src={editSvg} alt='Edit icon' />
                            <img onClick={() => removeRow(task)} src={removeSvg} alt='Remove icon' />
                        </div>
                </div>
            ))}
           <AddTaskForm list={list} onAddTask={onAddTask} />
        </div>
    </div>
  )
}
 