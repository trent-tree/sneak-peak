import React, { useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import tweetsData from "./data/tweets.json"
import type { Tweet } from "./types/Tweet"


function App() {
  // tweets is the current list of tweets on the page
  // setTweets is how react updates the list of tweets
  // We start with tweets from the JSON file
  const [tweets, setTweets] = useState<Tweet[]>(tweetsData as Tweet[])

  //input is what is currently typed in the box
  // setInput is how we hook into it
  const [input, setInput] = useState("")

  const handleYap = () => {
    // if input is empty, stop the function
      if(!input.trim()) return;
      const newTweet: Tweet = {
        id: Date.now(),
        name: "JoeSmoe",
        username: "@you",
        createdAt: new Date().toISOString(),
        text: input.trim(),
        likes: 0,
        replies: 0,
        tag: "",
      }
      // Put new tweet first, then copy all old tweets
      setTweets([newTweet, ...tweets]);
      // clear the input box after posting
      setInput("");
  };

  // Save the current time once during this render.
  const currentTime = new Date().toISOString();

  // Helper function that turns a date into "now", "2m", "3h", or "2d".
  const timeAgo = (iso?: string) => {
    if (!iso) return "now";
    const diff = new Date(currentTime).getTime() - new Date(iso).getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return "now";
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h`;
    const day = Math.floor(hr / 24);
    return `${day}d`;
  };


  return (
    <Box bg="gray.900" minH="100vh" py={8}>
      <Container maxW="650px">
        <VStack gap={5} align="stretch">
          <Box bg="gray.800" p={6} borderRadius="2xl" boxShadow="md">
            <Heading size="lg" color="white">
              TestName
            </Heading>
            <Text color="gray.400" mt={2}>
              A simple Twitter-style homepage built with React and Chakra UI.
            </Text>
          </Box>

          <Box bg="gray.800" p={5} borderRadius="2xl" boxShadow="md">
            <VStack gap={3} align="stretch">
              <Text fontWeight="bold" color="white">
                Create a post
              </Text>
              <Input
                placeholder="What's happening?"
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                value={input}
                // Every time user types, we update input
                onChange={(e) => setInput(e.target.value)}
              />
              <Button alignSelf="flex-end" bg="blue.500" color="white"
                 onClick={handleYap}
              >
           
                Yap
              </Button>
            </VStack>
          </Box>
          {/* Run javascript code inside html */}
          {tweets.map((tweet) => (
            <Box
              key={tweet.username}
              bg="gray.800"
              p={5}
              borderRadius="2xl"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.700"
            >
              <VStack align="stretch" gap={3}>
                <HStack justify="space-between" align="start">
                  <Box>
                    <HStack>
                      <Text fontWeight="bold" color="white">
                        {tweet.name}
                      </Text>
                      <Badge colorPalette="blue">{tweet.tag}</Badge>
                    </HStack>
                    <Text color="gray.400" fontSize="sm">
                      {tweet.username} · {timeAgo(tweet.createdAt)}
                    </Text>
                  </Box>
                </HStack>

                <Text color="white">{tweet.text}</Text>

                <HStack gap={6} color="gray.400" fontSize="sm">
                  <Text>💬 {tweet.replies}</Text>
                  <Text>❤️ {tweet.likes}</Text>
                  <Text>🔁 Share</Text>
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}

export default App;