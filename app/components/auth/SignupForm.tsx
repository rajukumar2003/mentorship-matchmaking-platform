'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import { emailSchema, type EmailInput } from '../../lib/validations/auth';
import { z } from 'zod';

export default function SignupForm() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [emailError, setEmailError] = useState<string>("");

	const router = useRouter();

	const handleGoogleSignIn = async () => {
		try {
			setIsLoading(true);
			await signIn("google", {
        callbackUrl: "/dashboard",
      });
		} catch (error) {
			console.error('Google sign-in error:', error);
			toast.error('An unexpected error occurred.');
		} finally {
			setIsLoading(false);
		}
	};

	const validateEmail = (email: string) => {
		try {
			emailSchema.parse({ email });
			setEmailError("");
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				setEmailError(error.errors[0].message);
			}
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setEmailError("");

		// Validate email
		if (!validateEmail(email)) {
			setIsLoading(false);
			return;
		}

		// Password must be at least 6 characters long
		if (password.length < 6) {
			toast.error('Password must be at least 6 characters long');
			setIsLoading(false);
			return;
		}

		try {
			const res = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password }),
			});

			if (res.ok) {
			  toast.success("Registration successful 🎉");
			  // Signing the user immediately after successful registration

			  const signInResult = await signIn("credentials", {
				redirect: false,
				email,
				password,
			  });
			  if (signInResult?.error) {
				toast.error("Error signing in after registration");
			  } else {
				router.push("/dashboard");
			  }
			} else {
				const data = await res.json();
				toast.error(data.message || 'Registration failed.');
			}
		} catch (error) {
			console.error('Registration failed:', error);
			toast.error('An unexpected error occurred.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
					<p className="mt-2 text-sm text-gray-600">
						Join us today and start your journey
					</p>
				</div>

				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<div className="space-y-4">
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-gray-700">
								Full Name
							</label>
							<input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								placeholder="Name"
							/>
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email Address
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="email"
									type="email"
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										if (e.target.value) validateEmail(e.target.value);
									}}
									required
									className={`block w-full pl-10 px-3 py-2 border ${
										emailError ? 'border-red-500' : 'border-gray-300'
									} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
									placeholder="you@example.com"
								/>
								{emailError && (
									<p className=" absolute text-sm text-red-600 ">{emailError}</p>
								)}
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<input
									id="password"
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									placeholder="••••••••"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400" />
									) : (
										<Eye className="h-5 w-5 text-gray-400" />
									)}
								</button>
							</div>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isLoading}
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
						>
							{isLoading ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								'Create Account'
							)}
						</button>
					</div>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">Or continue with</span>
						</div>
					</div>

					<button
						type="button"
						onClick={handleGoogleSignIn}
						disabled={isLoading}
						className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						<img
							src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
							alt="Google"
							className="h-5 w-5 mr-2"
						/>
						Sign up with Google
					</button>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					Already have an account?{' '}
					<a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
						Sign in
					</a>
				</p>
			</div>
		</div>
	);
}