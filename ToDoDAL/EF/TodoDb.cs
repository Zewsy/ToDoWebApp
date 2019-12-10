using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace ToDoDAL.EF
{
    public partial class TodoDb : DbContext
    {
        public TodoDb()
        {
        }

        public TodoDb(DbContextOptions<TodoDb> options)
            : base(options)
        {
        }

        internal virtual DbSet<dbProject> Projects { get; set; }
        internal virtual DbSet<dbStatus> Statuses { get; set; }
        internal virtual DbSet<dbTask> Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("D:\\GitHub\\TodoApp\\TodoAppWeb\\TodoAppWeb\\appsettings.json")
                .Build();
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("TodoDb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<dbProject>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
            });

            modelBuilder.Entity<dbStatus>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Statuses)
                    .HasForeignKey(d => d.ProjectId);
            });

            modelBuilder.Entity<dbTask>(entity =>
            {
                entity.HasIndex(e => e.ProjectId);

                entity.HasIndex(e => e.StatusId);

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

                entity.Property(e => e.StatusId).HasColumnName("StatusID");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.StatusId);
            });
        }
    }
}
