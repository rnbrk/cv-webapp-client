/**
 * -------------------------
 */

// const [name, setName] = useState('Exercise');
// const [exercises, setExercises] = useState([
//   { id: uuid(), title: 'Bench Press' },
//   { id: uuid(), title: 'Deadlift' },
//   { id: uuid(), title: 'Squats' }
// ]);

// const handleChange = e => {
//   setName(e.target.value);
// };

// const handleCreate = e => {
//   e.preventDefault();

//   if (name) {
//     setExercises([
//       ...exercises,
//       {
//         title: name,
//         id: uuid()
//       }
//     ]);
//   }
// };

// const handleDelete = id => setExercises(exercises.filter(exercise => exercise.id !== id));

// <Paper className={props.classes.paper}>
// <form onSubmit={handleCreate} className={props.classes.form}>
//   <TextField
//     name="title"
//     label="main"
//     value={name}
//     onChange={handleChange}
//     margin="normal"
//   />

//   <Button type="submit" color="primary" variant="contained">
//     Create
//   </Button>
// </form>
// <List>
//   {exercises.map(({ id, title }) => (
//     <ListItem key={id}>
//       <ListItemText primary={title} />
//       <ListItemSecondaryAction>
//         <IconButton color="primary" onClick={() => handleDelete(id)}>
//           <Delete />
//         </IconButton>
//       </ListItemSecondaryAction>
//     </ListItem>
//   ))}
// </List>
// </Paper>
