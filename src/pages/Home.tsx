import { HomeFifthSection } from '../components/Home/HomeFifthSection'
import { HomeFirstSection } from '../components/Home/HomeFirstSection'
import { HomeFourthSection } from '../components/Home/HomeFourthSection'
import { HomeSecondSection } from '../components/Home/HomeSecondSection'
import { HomeThirdSection } from '../components/Home/HomeThirdSection'

export const Home = () => {
  return (
    <main>
      <HomeFirstSection />
      <HomeSecondSection />
      <HomeThirdSection />
      <HomeFourthSection />
      <HomeFifthSection />
    </main>
  )
}
