#!/bin/bash

# Start the YAML file with "projects:"
echo "projects:" > .graphqlrc.yml

# Get list of directories in examples/
for dir in examples/*/; do
    # Remove trailing slash and "examples/" prefix
    project_name=$(basename "$dir")
    
    # Add project configuration to .graphqlrc.yml
    cat >> .graphqlrc.yml << EOF
  examples/${project_name}:
    schema:
      - "examples/${project_name}/src/modules/**/*.gql"
    include:
      - "examples/${project_name}/src/**/*.gql"

EOF
done

echo ".graphqlrc.yml file has been generated!"