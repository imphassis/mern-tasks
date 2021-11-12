import React from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

export default function TaskForm({
  task,
  handleSubmit,
  setTask,
  startDate,
  setStartDate,
}) {
  return (
    <Form id="task-form" className="m-3" onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="title-input mb-3">
        <Form.Label>
          Title
          <Form.Control
            type="text"
            placeholder="My Custom Task"
            name="title"
            value={task ? task.title : ''}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </Form.Label>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control
          as="textarea"
          rows={15}
          style={{ height: '100px' }}
          name="description"
          value={task ? task.description : ''}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <DatePicker
          className="date-input"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="Pp"
          timeFormat="HH:mm"
          name="date"
        />
      </Form.Group>
    </Form>
  );
}

/* <TaskForm
setTask={setTask}
task={task}
handleSubmit={handleSubmit}
startDate={startDate}
setStartDate={setStartDate}
/> */
