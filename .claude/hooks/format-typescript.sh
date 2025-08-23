#!/bin/bash

# Check for debug mode
DEBUG_MODE=false
if [[ "$*" == *"--debug"* ]]; then
    DEBUG_MODE=true
fi

# Debug logging function
debug_log() {
    if [ "$DEBUG_MODE" = true ]; then
        echo "$1"
    fi
}

debug_log "🚀 Hook started: format-typescript.sh"

# Read the hook input from stdin
input=$(cat)
debug_log "📥 Hook input received: $input"

# Extract the file path from the hook input JSON
file_path=$(echo "$input" | jq -r '.tool_input.file_path // empty')
debug_log "📁 Extracted file path: $file_path"

# Check if file_path is empty or null
if [ -z "$file_path" ] || [ "$file_path" = "null" ]; then
    debug_log "❌ No file path provided, exiting"
    exit 0
fi

# Check if the file is a TypeScript or TSX file
if [[ "$file_path" =~ \.(ts|tsx)$ ]]; then
    debug_log "✅ File is TypeScript/TSX: $file_path"
    # Check if the file exists
    if [ -f "$file_path" ]; then
        debug_log "✅ File exists, processing..."
        cd "$CLAUDE_PROJECT_DIR"
        debug_log "📂 Working directory: $(pwd)"
        
        # Run TypeScript type checking on the specific file
        debug_log "📝 Checking TypeScript file: $file_path"
        
        # Check for TypeScript errors (non-blocking)
        ts_output=$(pnpm ts --noEmit "$file_path" 2>&1)
        if [ $? -ne 0 ]; then
            echo "⚠️  TypeScript errors found:"
            echo "$ts_output" | grep -E "(error TS[0-9]+|\.tsx?.*\([0-9]+,[0-9]+\))"
        else
            debug_log "✅ No TypeScript errors found"
        fi
        
        # Format with Prettier first
        debug_log "🎨 Running Prettier on: $file_path"
        prettier_output=$(pnpm prettier "$file_path" --write 2>/dev/null)
        prettier_exit_code=$?
        debug_log "🎨 Prettier exit code: $prettier_exit_code"
        if [ -n "$prettier_output" ]; then
            debug_log "🎨 Prettier output: $prettier_output"
        fi
        
        # Then format with ESLint (use direct eslint command with --fix)
        debug_log "🔧 Running: pnpm eslint \"$file_path\" --fix"
        fix_output=$(pnpm eslint "$file_path" --fix 2>/dev/null)
        fix_exit_code=$?
        debug_log "🔧 ESLint fix exit code: $fix_exit_code"
        if [ -n "$fix_output" ]; then
            debug_log "🔧 ESLint fix output: $fix_output"
        fi
        
        # Check remaining ESLint issues after formatting (only show if there are actual errors)
        debug_log "🔍 Checking remaining issues after fix..."
        remaining_issues=$(pnpm eslint "$file_path" 2>/dev/null)
        remaining_exit_code=$?
        debug_log "🔍 Remaining issues check exit code: $remaining_exit_code"
        if [ $remaining_exit_code -ne 0 ] && [ -n "$remaining_issues" ]; then
            echo "⚠️  ESLint issues remaining:"
            echo "$remaining_issues"
        else
            debug_log "✅ File formatted successfully"
        fi
    else
        debug_log "❌ File does not exist: $file_path"
    fi
else
    debug_log "ℹ️  File is not TypeScript/TSX, skipping: $file_path"
fi

debug_log "🏁 Hook completed: format-typescript.sh"
exit 0