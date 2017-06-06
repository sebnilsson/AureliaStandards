using System;

namespace AureliaStandards.WebApp
{
    public class TaskItem
    {
        public TaskItem()
        {
            this.Id = Guid.NewGuid();
            this.CreatedAt = DateTime.UtcNow;
            this.UpdatedAt = DateTime.UtcNow;
        }

        public DateTime CreatedAt { get; set; }

        public string DetailsText { get; set; }

        public Guid Id { get; set; }

        public bool IsDone { get; set; }

        public string TitleText { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}