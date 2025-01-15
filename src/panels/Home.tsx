import type { UserInfo } from '@vkontakte/vk-bridge'
import type {
  NavIdProps,
} from '@vkontakte/vkui'
import type { FC } from 'react'
import {
  Avatar,
  Cell,
  Div,
  Group,
  Header,
  Panel,
  PanelHeader,
} from '@vkontakte/vkui'
import { generateMathExamples } from '../utils/create-examples'

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser }
  // const routeNavigator = useRouteNavigator()

  const examples1 = generateMathExamples(1).map((item, index) => (
    <li key={index}>
      {item.expression}
      {' '}
      <span>{item.answer}</span>
    </li>
  ))
  const examples2 = generateMathExamples(2).map((item, index) => (
    <li key={index}>
      {item.expression}
      {' '}
      <span>{item.answer}</span>
    </li>
  ))
  const examples3 = generateMathExamples(3).map((item, index) => (
    <li key={index}>
      {item.expression}
      {' '}
      <span>{item.answer}</span>
    </li>
  ))

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <ul>
            {examples1}
          </ul>
          <ul>
            {examples2}
          </ul>
          <ul>
            {examples3}
          </ul>
        </Div>
      </Group>
    </Panel>
  )
}
