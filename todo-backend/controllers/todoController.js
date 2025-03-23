const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  try {
    const todos = await Todo.find()
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
      
    const count = await Todo.countDocuments();
    
    res.json({
      todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalTodos: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const newTodo = new Todo({
      title: title || 'New Additions',
      description: description || 'To stay representative of framework & new example apps.',
    });
    
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.updatedAt = Date.now();
    
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    await todo.deleteOne();
    res.json({ message: 'Todo removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};