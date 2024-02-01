import React from 'react'
import { lazily } from 'react-lazily'
import { Route, Routes } from 'react-router-dom'

import { BasePathRedirect, NotFoundRedirect } from '@components/redirect-wrapper'
import { PathNotFound } from '@components/result'
import { FormLayout, HomeLayout } from '@components/layout'
import { AdminGuard, GuestGuard, ProtectedGuard } from '@components/guard'
import { FormsLayout } from '@components/layout/forms-layout'
import { FormScreen } from './form'

const { LoginScreen } = lazily(() => import('./login'))
const { HomeScreen } = lazily(() => import('./home'))

export const Main: React.FC = () => (
	<Routes>
		<Route path='/' element={<BasePathRedirect />} />
		<Route element={<GuestGuard />}>
			<Route path='/login' element={<LoginScreen />} />
		</Route>
		<Route element={<ProtectedGuard />}>
			<Route element={<HomeLayout />}>
				<Route path='/home' element={<HomeScreen />} />
			</Route>

			<Route path='/form' element={<HomeLayout />}>
				<Route index element={<>Is Coming</>} />
				<Route path='/form/:formId/:recordId?' element={<>Is Coming</>} />
			</Route>

			<Route path='/form-task' element={<FormsLayout />}>
				<Route index element={<FormScreen />} />
				<Route path='/form-task/:formId/:recordId?' element={<>Is Coming</>} />
			</Route>
		</Route>
		<Route path='/not_found' element={<PathNotFound />} />
		<Route path='*' element={<NotFoundRedirect />} />
	</Routes>
)
