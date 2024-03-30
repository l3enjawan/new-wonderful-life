# Use an official Nginx image
FROM nginx:alpine
# Remove the default Nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy the entire client directory (with subdirectories)
COPY . /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]