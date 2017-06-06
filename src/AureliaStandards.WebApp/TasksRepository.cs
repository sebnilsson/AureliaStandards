using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace AureliaStandards.WebApp
{
    public class TasksRepository
    {
        private readonly HashSet<TaskItem> tasks = new HashSet<TaskItem>();

        public void AddOrUpdate(TaskItem task)
        {
            if (task == null)
            {
                throw new ArgumentNullException(nameof(task));
            }

            lock (this.tasks)
            {
                bool taskExists = this.tasks.Any(x => x.Id == task.Id);
                if (taskExists)
                {
                    this.Update(task);
                }
                else
                {
                    this.Add(task);
                }
            }
        }

        public bool ContainsId(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException(nameof(id));
            }

            var task = this.TryGetById(id);

            bool taskExists = (task != null);
            return taskExists;
        }

        public TaskItem GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException(nameof(id));
            }

            var task = this.TryGetById(id);

            if (task == null)
            {
                throw new ArgumentOutOfRangeException(nameof(task), $"Task with ID '{id}' was not found.");
            }

            return task;
        }

        public IReadOnlyCollection<TaskItem> GetAll()
        {
            IReadOnlyCollection<TaskItem> list;
            lock (this.tasks)
            {
                list = new ReadOnlyCollection<TaskItem>(this.tasks.ToList());
            }

            return list;
        }

        public void Remove(TaskItem task)
        {
            if (task == null)
            {
                throw new ArgumentNullException(nameof(task));
            }

            var taskId = task.Id;

            lock (this.tasks)
            {
                if (!this.tasks.Contains(task))
                {
                    task = this.tasks.FirstOrDefault(x => x.Id == task.Id);
                }

                if (task == null)
                {
                    throw new ArgumentOutOfRangeException(nameof(task), $"Task with ID '{taskId}' was not found.");
                }

                bool isRemoveSuccess = this.tasks.Remove(task);
                if (!isRemoveSuccess)
                {
                    throw new ArgumentOutOfRangeException(nameof(task), $"Task with ID '{taskId}' failed to remove.");
                }
            }
        }

        public void RemoveById(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentOutOfRangeException(nameof(id));
            }

            var task = this.GetById(id);

            this.Remove(task);
        }

        private void Add(TaskItem task)
        {
            this.tasks.Add(task);
        }

        private TaskItem TryGetById(Guid id)
        {
            TaskItem task;
            lock (this.tasks)
            {
                task = this.tasks.FirstOrDefault(x => x.Id == id);
            }

            return task;
        }

        private void Update(TaskItem updatedTask)
        {
            var existingTask = this.tasks.FirstOrDefault(x => x == updatedTask || x.Id == updatedTask.Id);

            if (existingTask == null)
            {
                throw new ArgumentOutOfRangeException(
                    nameof(updatedTask),
                    $"Task with ID '{updatedTask.Id}' was not found.");
            }

            existingTask.CreatedAt = updatedTask.CreatedAt;
            existingTask.DetailsText = updatedTask.DetailsText;
            existingTask.IsDone = updatedTask.IsDone;
            existingTask.TitleText = updatedTask.TitleText;
            existingTask.UpdatedAt = updatedTask.UpdatedAt;
        }
    }
}