const Todo = require('../models/todos');

exports.createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const todoItem = await Todo.create({
      title,
      description,
      status,
      userId: req.user._id,
    });

    // Populate `user` with `username` and `_id`
    const populatedTodo = await Todo.findById(todoItem._id)
      .populate('userId', 'name _id')
      .select('-__v -_id');

    res.status(201).json({
      Msg: 'Todo created successfully',
      Todo: populatedTodo,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find()
      .populate('userId', 'name _id')
      .select('-__v');

    res
      .status(200)
      .json({ noOfTodo: todos.length, Todo: todos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve todos' });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { _id } = req.params;
    const update = req.body;
    const todos = await Todo.findByIdAndUpdate(
      { _id, user: req.user._id },
      update,
      { new: true }
    )
      .populate('userId', 'name _id')
      .select('-__v');

    if (!todos) return res.status(404).json({ error: 'Todo not found' });
    res
      .status(200)
      .json({ Msg: 'Todo updated successfully', Todo: todos });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) return res.status(400).json({ error: 'Todo ID is required' });
    const todos = await Todo.findByIdAndDelete({
      _id,
      user: req.user._id,
    });
    if (!todos) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: `${_id} Todo deleted successfully` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
