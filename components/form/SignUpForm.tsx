'use client';

import { useForm } from 'react-hook-form';
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserSignUpValidation } from '@/lib/validations/user'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import GoogleSignInButton from '@/components/button/GoogleSignInButton'
import { useToast } from '@/components/ui/use-toast'

interface SignUpFormProps {
  callbackUrl: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ callbackUrl }) => {
  const { pending } = useFormStatus()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof UserSignUpValidation>>({
    resolver: zodResolver(UserSignUpValidation),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UserSignUpValidation>) => {
    console.log(values)
    toast({
      description: 'Sign up suceesfully.'
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder='your username'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='mail@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Confirm your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className='w-full mt-6'
          type='submit'
          disabled={pending}
        >
          {pending ? 'Submitting...' : 'Sign up'}
        </Button>
      </form>
      <div className='flex items-center justify-center my-4'>
        <div className='border-b border-gray-400 w-full'></div>
        <span className='px-2 text-gray-400'>or</span>
        <div className='border-b border-gray-400 w-full'></div>
      </div>
      <GoogleSignInButton callbackUrl={callbackUrl}>
        Sign up with Google
      </GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        Already have an account?&nbsp;
        <Link className='text-blue-600 hover:underline' href='/signin'>
          Sign in
        </Link>
      </p>
    </Form>
  )
}

export default SignUpForm