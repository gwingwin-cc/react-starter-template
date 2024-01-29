import React from 'react'
import { Spin } from 'antd'

export const LoadingSpinner: React.FC = () => (
	<div className='min-h-screen flex'>
		<Spin className='px-[50%] py-[20%]' />
	</div>
)
