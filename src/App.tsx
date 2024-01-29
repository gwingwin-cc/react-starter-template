import { ConfigProvider, Spin } from 'antd'
import React, { Suspense } from 'react'

import thTH from 'antd/locale/th_TH'
import { ErrorProvider } from './context'
import { Main } from './pages'

const App: React.FC = () => (
	<Suspense fallback={<Spin className='px-[50%] py-[20%]' />}>
		<ConfigProvider
			locale={thTH}
			theme={{
				token: {
					fontFamily: `'Noto Sans Thai', sans-serif`,
				},
			}}
		>
			<ErrorProvider>
				<Main />
			</ErrorProvider>
		</ConfigProvider>
	</Suspense>
)

export default App
