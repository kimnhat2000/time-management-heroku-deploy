const taskFilter = (tasks, {text, sortBy}) => {
    return tasks.filter(t => {
        const f = t.name.toLowerCase().includes(text.toLowerCase());
        return f
    }).sort((a,b) => {
        if (sortBy === 'time') {
            return a.hour*60 + a.minute < b.hour*60 + b.minute ? 1 : -1
        }else if (sortBy === 'name') {
            return a.name < b.name
        } 
    });
};

export default taskFilter