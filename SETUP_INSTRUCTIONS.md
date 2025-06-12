# Supabase Setup Instructions

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following content:

```env
# Database
DATABASE_URL="postgresql://postgres.ofioqagspurgrlakhulr:[YOUR-PASSWORD]@aws-0-us-east-2.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.ofioqagspurgrlakhulr:[YOUR-PASSWORD]@aws-0-us-east-2.pooler.supabase.com:5432/postgres"
```

**Important:** Replace `[YOUR-PASSWORD]` with your actual Supabase password.

## 2. Database Setup

Run the following commands to set up the database:

```bash
# Generate Prisma client
npx prisma generate

# Push the schema to your database (creates the new table)
npx prisma db push
```

## 3. Verify Database

After running the commands, you should see a new table called `student_profiles` in your Supabase database with the following structure:

- `id` (String, Primary Key)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)
- `fullName` (String)
- `email` (String, Unique)
- `country` (String, default: "United States")
- `university` (String, optional)
- `program` (String, optional)
- `degreeLevel` (String, optional)
- `fundsRequested` (Float, optional)
- `quickBio` (Text, optional)
- `past` (Text, optional)
- `present` (Text, optional)
- `future` (Text, optional)
- `misc` (Text, optional)
- `socialLinks` (JSON, optional)
- `walletAddress` (String, optional)
- `status` (String, default: "pending")

## 4. Features

The form now includes:

- ✅ Full form validation with Zod
- ✅ Real-time error handling
- ✅ Proper loading states
- ✅ Database integration with Supabase
- ✅ Solana wallet address validation
- ✅ Character counting for text fields
- ✅ Social links management
- ✅ Success page redirect after submission

## 5. Error Handling

The system handles various error types:
- Validation errors (required fields, email format, etc.)
- Database connection errors
- Duplicate email addresses
- Network errors
- Unexpected server errors

## 6. Data Safety

- The new `StudentProfile` model is completely separate from existing `Student` and `Donor` models
- No existing data will be affected
- The table is mapped to `student_profiles` to avoid conflicts

## 7. Testing

After setup, test the form by:
1. Filling out all steps
2. Trying to submit with missing required fields (should show error)
3. Trying to submit with invalid email (should show error)
4. Submitting a complete form (should redirect to success page)
5. Check your Supabase database to see the new record 