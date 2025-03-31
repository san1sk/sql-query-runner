import styled from 'styled-components';
import { FaMoon, FaSun, FaGithub } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  grid-column: 1 / -1;
  grid-row: 1;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    color: ${({ theme }) => theme.primary};
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  
  &:hover {
    background-color: ${({ theme }) => theme.border};
  }
`;

const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <HeaderContainer>
      <Logo>
        SQL <span>Query Editor</span>
      </Logo>
      <Controls>
        <a href="https://github.com/yourusername/sql-query-editor" target="_blank" rel="noopener noreferrer">
          <ThemeToggle title="View on GitHub">
            <FaGithub />
          </ThemeToggle>
        </a>
        <ThemeToggle onClick={toggleTheme} title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </Controls>
    </HeaderContainer>
  );
};

export default Header;
