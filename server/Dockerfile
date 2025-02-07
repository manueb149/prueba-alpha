# Stage 1: Base build stage
FROM python:3.13-slim AS builder

# Create the working directory
RUN mkdir /app

# Set working directory
WORKDIR /app

# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies
RUN pip install --upgrade pip 
COPY requirements.txt /app/ 
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Production stage
FROM python:3.13-slim

# Copy the Python dependencies from the builder stage
COPY --from=builder /usr/local/lib/python3.13/site-packages/ /usr/local/lib/python3.13/site-packages/
COPY --from=builder /usr/local/bin/ /usr/local/bin/

# Set the working directory
WORKDIR /app

# Copy code to the working directory
COPY . /app/

# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Expose the application port
EXPOSE 8000

# Make entry file executable
RUN chmod +x /app/entrypoint.sh

# Start the application
CMD ["/app/entrypoint.sh"]