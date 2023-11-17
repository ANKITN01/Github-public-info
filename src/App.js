import React, { useState} from 'react';
import './App.css';
import { ChakraProvider, Card, CardBody, Image, Stack, Heading, Text, Button, Input, Center } from '@chakra-ui/react';

function App() {
  const [user, setUser] = useState('');
  const [avtarImg, setavtarImg] = useState('');
  const [name, setName] = useState('');
  const [publicRepos, setPublicRepos] = useState('');
  const [publicGists, setpublicGists] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [print, setPrint] = useState(false);

  const data = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();

      setName(result.name);
      setavtarImg(result.avatar_url);
      setPublicRepos(result.public_repos);
      setpublicGists(result.public_gists);
      setCreatedAt(result.created_at);
      setPrint(true);
    } catch (error) {
      console.error(error.message);
    }
  };


  let year, month, day;

  if (createdAt) {
    const date = new Date(createdAt);
    year = date.getFullYear().toString();
    month = (date.getMonth() + 1).toString();
    day = date.getDate().toString();
  }

  return (
    <ChakraProvider>
      <Center height="100vh" flexDirection="column" border='1px solid gray'>
        <Heading mb="6">GitHub Public Information</Heading>
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
        >
          <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            src={avtarImg}
            alt='User Avatar'
          />

          <Stack>
            <CardBody>
              <Input
                placeholder='Enter GitHub Username'
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              {print ? <Heading size='md'>Username: {user}</Heading> : null}
              <Text py='2'>{name}</Text>
              <Text py='2'>Public Repos: {publicRepos}</Text>
              <Text py='2'>Public Gists: {publicGists}</Text>
              <Text py='2'>Created At: {year}-{month}-{day}</Text>
            </CardBody>
            <Button variant='solid' colorScheme='blue' onClick={data}>
              Search User
            </Button>
          </Stack>
        </Card>
      </Center>
    </ChakraProvider>
  );
}

export default App;
